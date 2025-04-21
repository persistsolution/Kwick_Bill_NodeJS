import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tbl_cust_sub_category_2025", function (table) {
        table.increments("id").primary(); 
        table.integer("CatId").notNullable();
        table.string("Name", 255).collate("utf8mb4_general_ci").defaultTo(null);
        table.string("Photo", 255).collate("utf8mb4_general_ci").defaultTo(null);
        table.smallint("Status").notNullable().defaultTo(1);
        table.integer("FrId").notNullable();
        table.integer("ProdType").notNullable()
            .comment("0: custcat; 1: rawcat;")
            .checkBetween([0, 1]); 
        table.integer("CreatedBy").notNullable();
        table.timestamp("CreatedDate").defaultTo(knex.fn.now()).notNullable();
        table.integer("ModifiedBy").notNullable();
        table.timestamp("ModifiedDate").nullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("tbl_cust_sub_category_2025");
}
