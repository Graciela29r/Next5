import { supabase } from '../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || '';

    let query = supabase.from('gallery_images').select('*').order('created_at', { ascending: false });

    if (search.trim()) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, image_url } = await req.json();

    if (!title || !image_url) {
      return NextResponse.json(
        { error: 'Title and image_url are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('gallery_images')
      .insert([
        {
          title,
          description,
          image_url,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ data: data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json(
      { error: 'Failed to create image' },
      { status: 500 }
    );
  }
}
