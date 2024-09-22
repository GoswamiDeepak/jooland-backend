import ApiResponse from '../utils/api-response.js';
import CustomErrorHandler from '../utils/custom-errorHandler.js';
import { productSchema } from '../validators/product-validator.js';
import { Product } from './product.model.js';

class ProductController {
    //create product method
    async createProduct(req, res, next) {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            const product = await Product.create(req.body);
            if (!product) {
                return next(
                    CustomErrorHandler.serverError('Something went wrong.!')
                );
            }
            res.status(201).json(
                new ApiResponse(201, product, 'Product created!')
            );
        } catch (error) {
            next(error);
        }
    }
    //get all products
    async getProducts(req, res, next) {
        const {
            category,
            brand,
            colors,
            sizes,
            _sort,
            _order,
            page = 1,
            limit = 5,
        } = req.query;

        // Build the query object based on filters
        let filter = {};

        if (category) {
            filter.category = { $in: category.split(',') };
        }

        if (brand) {
            filter.brand = { $in: brand.split(',') };
        }
        if (colors) {
            filter.colors = { $in: colors.split(',') };
        }
        if (sizes) {
            filter.sizes = { $in: sizes.split(',') };
        }

        // Pagination variables
        const skip = (page - 1) * limit;
        const sort = _sort && _order ? { [_sort]: _order } : {};

        try {
            // Get the total count of filtered documents (without pagination)
            const totalDocuments = await Product.countDocuments(filter);

            // Get the filtered documents with pagination and sorting
            const products = await Product.find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            if (!products) {
                return next(CustomErrorHandler.serverError());
            }
            // Calculate total pages
            const totalPages = Math.ceil(totalDocuments / limit);

            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        totalDocuments, // Total number of filtered documents
                        totalPages, // Total pages based on limit
                        currentPage: page, // Current page number
                        products, // The actual filtered and paginated products
                    },
                    'products retrieved!'
                )
            );
        } catch (error) {
            next(error);
        }
    }
    //get single products
    async getSingleProduct(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(
                CustomErrorHandler.badRequest(
                    'Please provide a valid product id'
                )
            );
        }
        try {
            const product = await Product.findById(id, { __v: 0 });
            if (!product) {
                return next(CustomErrorHandler.serverError());
            }
            return res
                .status(200)
                .json(new ApiResponse(200, product, 'product'));
        } catch (error) {
            next(error);
        }
    }
    async updateProduct(req, res, next) {
        const { id } = req.params;
    }
    //delete product
    async deleteProduct(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(
                CustomErrorHandler.badRequest(
                    'Please provide a valid product id'
                )
            );
        }

        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return next(CustomErrorHandler.serverError());
            }
            res.status(200).json(
                new ApiResponse(200, '', 'prduct is deleted!')
            );
        } catch (error) {
            next(error);
        }
    }
}
export const productController = new ProductController();

//step 1
// async getProducts(req, res, next) {
//     let page = req.query.page || 1;
//     let limit = req.query.limit || 5;
//     const skip = (page - 1) * limit;
//     //search by category

//     try {
//         const products = await Product.find({
//             $and: [
//                 // {
//                 //     category: { $in: req.query.category.split(',') },
//                 // },
//                 // {
//                 //     brand: { $in: req.query.brand.split(',') },
//                 // },
//                 {
//                     colors: { $in: req.query.colors.split(',') },
//                 },
//             ],
//         })
//             .sort({ [req.query._sort]: req.query._order })
//             .skip(skip)
//             .limit(limit);
//         const totalProducts = await Product.countDocuments();
//         const totalPages = Math.ceil(totalProducts / limit);
//         return res
//             .status(200)
//             .json(
//                 new ApiResponse(200, { products, totalPages }, 'products ')
//             );
//     } catch (error) {
//         console.log(error);

//         next(error);
//     }
// }

// async getProducts(req, res, next) {
//     let query = Product.find({});
//     if (req.query.category) {
//         query = query.find({
//             category: { $in: req.query.category.split(',') },
//         });
//     }
//     if (req.query.brand) {
//         query = query.find({ brand: req.query.brand.split(',') });
//     }
//     if (req.query._sort && req.query._order) {
//         query = query.sort({ [req.query._sort]: req.query._order });
//     }
//     if (req.query.page && req.query.limit) {
//         query = query
//             .skip((req.query.page - 1) * req.query.limit)
//             .limit(req.query.limit);
//     }
//     console.log(query);
//     try {
//         const product = await query;
//         res.json(product);
//     } catch (error) {
//         console.log(error);
//     }
// }
