import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tbl_brands', function(table) {
        table.increments('id').primary();
        table.string('name', 255).nullable();
        table.integer('srno').notNullable();
        table.smallint('status').notNullable().defaultTo(1);
        table.integer('createdby').notNullable();
        table.datetime('createddate').nullable();
        table.integer('modifiedby').notNullable();
        table.datetime('modifieddate').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tbl_brands');
}
