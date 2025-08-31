interface Article {
    item: string,
    quantity: number,
    regular_price: number,
    member_price: number,
    tax_stratus: "Taxable" | "Tax-Exempt"
}