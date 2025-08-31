"use strict";
const TotalsComponent = (props) => {
    const component = ComponentFactory.createComponent("totals", "div");
    console.log(props);
    const tax_rate = 0.06;
    const totals = () => {
        const response = props.cartArticles.reduce((sums, a) => {
            const price_type = props.customer === "Regular Customer" ? "regular_price" : "member_price";
            sums.subtotal += a[price_type];
            if (a.tax_status === "Taxable")
                sums.tax += a[price_type] * tax_rate;
            sums.regular_tax += a.regular_price * tax_rate;
            sums.regular_subtotal += a.regular_price;
            return sums;
        }, { subtotal: 0, tax: 0, regular_tax: 0, regular_subtotal: 0 });
        console.log(response);
        return response;
    };
    const handleTotals = () => {
        const t = totals();
        const total = t.tax + t.subtotal;
        const regular_total = t.regular_tax + t.regular_subtotal;
        return {
            subtotal: t.subtotal,
            fixed_subtotal: t.subtotal.toFixed(2),
            tax: t.tax,
            fixed_tax: t.tax.toFixed(2),
            total: total,
            fixed_total: total.toFixed(2),
            savigs: regular_total - total
        };
    };
    const calculateChange = (e) => {
        e.preventDefault;
        const cash = totalsReceivedCash.getValues()["cash"];
        const total = handleTotals().total;
        if (total > cash)
            return window.alert("The provided cash is not enough");
        Router.navigate("/check-out", { "change": Number(cash) - total, "cartArticles": props.cartArticles, "customer": props.customer, "cash": totalsReceivedCash.getValues()['cash'] });
    };
    const generateReceipt = (e) => {
        e.preventDefault();
        const cart = {
            items: props.cartArticles,
            subtotal: handleTotals().subtotal,
            tax: handleTotals().tax,
            total: handleTotals().total,
            cash: Number(props.cash),
            change: props.change,
            savings: handleTotals().savigs
        };
        CheckoutServices.generateReceipt(cart)
            .then(res => {
            console.log(res);
            Router.navigate('/console');
        });
    };
    const totalsSubtotal = component.addContainerHtml(component, "div")
        .setClassName("totals-line")
        .build();
    component.addTitleHtml(totalsSubtotal, "h4")
        .setClassName("totals-label")
        .setText("Subtotal:")
        .build();
    component.addContainerHtml(totalsSubtotal, "p")
        .setClassName("totals-label")
        .setText(`$ ${handleTotals().fixed_subtotal}`)
        .build();
    const totalsTax = component.addContainerHtml(component, "div")
        .setClassName("totals-line")
        .build();
    component.addTitleHtml(totalsTax, "h4")
        .setClassName("totals-label")
        .setText("Tax(6%):")
        .build();
    component.addContainerHtml(totalsTax, "p")
        .setClassName("totals-label")
        .setText(`$ ${handleTotals().fixed_tax}`)
        .build();
    const totalsTotal = component.addContainerHtml(component, "div")
        .setClassName("totals-line")
        .build();
    component.addTitleHtml(totalsTotal, "h4")
        .setClassName("totals-label")
        .setText("Total:")
        .build();
    component.addContainerHtml(totalsTotal, "p")
        .setClassName("totals-label")
        .setText(`$ ${handleTotals().fixed_total}`)
        .build();
    const totalsReceivedCash = component.addForm(component)
        .setClassName("totals-line")
        .build();
    component.addTitleHtml(totalsReceivedCash, "h4")
        .setClassName("totals-label")
        .setText("Received cash:")
        .build();
    component.addInput(totalsReceivedCash)
        .setType("text")
        .setRequired(true)
        .setName("cash")
        .build(totalsReceivedCash);
    component.addButtonHtml(component)
        .setClassName("change-button")
        .setText("Calculate change")
        .setClickAction(calculateChange)
        .build();
    if (props && props.change) {
        const totalsCash = component.addForm(component)
            .setClassName("totals-line")
            .build();
        component.addTitleHtml(totalsCash, "h4")
            .setClassName("totals-label")
            .setText("Cash:")
            .build();
        component.addContainerHtml(totalsCash, "p")
            .setClassName("totals-label")
            .setText(`$ ${props.cash}`)
            .build();
        const totalsChange = component.addForm(component)
            .setClassName("totals-line")
            .build();
        component.addTitleHtml(totalsChange, "h4")
            .setClassName("totals-label")
            .setText("Change:")
            .build();
        component.addContainerHtml(totalsChange, "p")
            .setClassName("totals-label")
            .setText(`$ ${props.change.toFixed(2)}`)
            .build();
        component.addButtonHtml(component)
            .setClassName("finish-button")
            .setText("Generate Receipt")
            .setClickAction(generateReceipt)
            .build();
    }
    return component;
};
window.TotalsComponent = TotalsComponent;
