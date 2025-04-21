import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tbl_godown_raw_prod_stock_2025', function(table) {
        table.increments('id').primary();
        table.integer('InvId').notNullable();
        table.integer('GodownId').notNullable();
        table.integer('FranchiseId').notNullable();
        table.integer('ProdId').nullable();
        table.string('Qty', 100).nullable();
        table.string('Unit', 100).nullable();
        table.date('StockDate').nullable();
        table.text('Narration');
        table.string('Status', 10).nullable();
        table.integer('CreatedBy').notNullable();
        table.date('CreatedDate').nullable();
        table.integer('ModifiedBy').notNullable();
        table.date('ModifiedDate').nullable();
        table.integer('UserId').notNullable();
        table.integer('TransferId').notNullable();
        table.float('Price', 14, 2).nullable();
        table.float('TotalPrice', 14, 2).nullable();
        table.string('CgstPer', 20).nullable();
        table.string('SgstPer', 20).nullable();
        table.string('IgstPer', 20).nullable();
        table.float('CgstAmt', 14, 2).nullable();
        table.float('SgstAmt', 14, 2).nullable();
        table.float('IgstAmt', 14, 2).nullable();
        table.float('GstAmt', 14, 2).nullable();
        table.smallint('OwnShop').notNullable().defaultTo(0);;
        table.integer('RetailerId').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('tbl_godown_raw_prod_stock_2025');
}

