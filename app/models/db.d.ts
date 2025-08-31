interface Article {
    item: string,
    quantity: number,
    regular_price: number,
    member_price: number,
    tax_status: "Taxable" | "Tax-Exempt"
}