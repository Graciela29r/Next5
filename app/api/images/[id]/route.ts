import { supabase } from '../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// 1. Definimos un tipo limpio para el contexto que Next.js entienda perfectamente
type RouteContext = {
  params: Promise<{ id: string }>;
};

// --- MÉTODO GET ---
export async function GET(
  req: NextRequest,
  context: RouteContext // Usamos la estructura que el validador de Next espera
) {
  try {
    const { id } = await context.params; // Extraemos el id desde context.params

    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

// --- MÉTODO PUT ---
export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const { title, description, image_url } = await req.json();

    const { data, error } = await supabase
      .from('gallery_images')
      .update({
        title,
        description,
        ...(image_url && { image_url }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ data: data[0] });
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

// --- MÉTODO DELETE ---
export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}