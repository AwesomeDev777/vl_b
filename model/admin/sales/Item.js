const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        type:String,
    },
    long_description: {
        type: String
    },
    rate: {
        type: Number,
        required: true
    },
    tax: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax',
    },
    tax2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax',
    },
    unit: {
        type: String
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemGroup',
        required:true
    },
    commodity_code: {
        type: String
    },
    commodity_barcode: {
        type: String
    },
    commodity_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commodity_Type',
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Warehouse',
    },
    origin: {
        type: String
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color_Type',
    },
    style: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Style_Type',
    },
    // model_id: {
    //     type: String
    // },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size_Type',
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit_Type',
    },
    sku_code: {
        type: String
    },
    sku_name: {
        type: String
    },
    purchase_price: {
        type: Number
    },
    sale_price: {
        type: Number
    },
    sub_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sub_Group',
    },
    created: {
        type: Date,
        default: Date.now
    },
    commodity_name: {
        type: String
    },
    guarantee: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    without_checking_warehouse: {
        type: Boolean,
        default: true
    },
    // series_id: {
    //     type: String
    // },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    attributes: {
        type: String
    },
    parent_attributes: {
        type: String
    },
    rate_currency_2: {
        type: Number
    },
    fieldvalues: [
        {
            value : {
                type: String
            },
            field : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ItemField'
            },
        }
    ]
})

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item; 