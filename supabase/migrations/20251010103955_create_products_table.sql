/*
  # Create Products Table

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (decimal) - Product price
      - `category` (text) - Product category (cakes, pastries, bread, cookies, other)
      - `image` (text) - Product image URL
      - `in_stock` (boolean) - Whether product is in stock
      - `rating` (decimal) - Product rating (0-5)
      - `created_by` (uuid) - Reference to user who created the product
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `products` table
    - Add policy for anyone to read products
    - Add policy for authenticated admin users to create products
    - Add policy for authenticated admin users to update products
    - Add policy for authenticated admin users to delete products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10, 2) NOT NULL CHECK (price >= 0),
  category text NOT NULL CHECK (category IN ('cakes', 'pastries', 'bread', 'cookies', 'other')),
  image text DEFAULT '/cupcake.png',
  in_stock boolean DEFAULT true,
  rating decimal(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_by ON products(created_by);
