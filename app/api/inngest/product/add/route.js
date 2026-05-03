import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/lib/authSeller";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized Access" });
        }

        const formData = await request.formData();

        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice'); 

        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: "Please upload product images" });
        }

        const result = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    )
                    stream.end(buffer);
                })
            })
        )

        const image = result.map(result => result.secure_url)

            await connectDB()
            const newProduct = await Product.create({
                userId,
                name,
                description,
                category,
                price:Number(price),
                offerPrice:Number(offerPrice),
                image,
                date: Date.now()
            })

        // Here you would save the product to your database, e.g.:
        // await Product.create({ name, description, images: uploadResults, offerPrice, price, category, seller: userId });

        return NextResponse.json({
            success: true,
            message: "Product added successfully",
            images: uploadResults,
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message});
    }
}