import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tbl_units_2025", (table) => {
        table.increments("id").primary();
        table.string("Name", 100).nullable();
        table.string("Name2", 100).nullable();
        table.smallint("Status").notNullable().defaultTo(1);
        table.smallint("roll").notNullable().defaultTo(0);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("tbl_units_2025");
}

