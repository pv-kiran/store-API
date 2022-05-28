const Product = require('../model/Product')

const getAllProducts = async (req , res) => {

    try {
        const products = await Product.find({price: {$gt: 100}}).sort('price').skip(3).limit(7);
        if(!products) {
        return res.status(404).send('No products are available')
        } else {
            res.status(200).json({
                success: true ,
                data: products , 
                hits: products.length
            })
        }
    } catch (error) {
        res.status(500).json(error);
    }
}



const searchProducts = async (req,res) => {
    // console.log(req.query);
    const {name, featured, company, sort , fields , numericFilters} = req.query;
    queryObject = {}
    if(name) {
        queryObject.name = {$regex: name , $options: 'i'};
    }
    if(numericFilters) {
        // console.log(numericFilters);
        const operatorMap = {
            '>': '$gt' ,
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt' ,
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(regEx , (match) => {
           return `-${operatorMap[match]}-`
        })
        const options = ['price' , 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)) {
                queryObject[field] = {[operator] : Number(value)}
            }
        })
    }
    if(featured) {
        queryObject.featured = featured;
    }
    if(company) {
        queryObject.company = company;
    }
    // console.log(queryObject);
    let result = Product.find(queryObject);
    //  console.log(result)
    // sort
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('craetedAt')
    }

    // selection 
    if(fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    } else {
        result = result.sort('craetedAt')
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1 ) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result
    if(!products) {
       return res.status(404).send('No products are available') 
    } else {
        res.status(200).json({
            data: products ,
            hits: products.length
        })
    }
}

module.exports = {
    getAllProducts,
    searchProducts
}