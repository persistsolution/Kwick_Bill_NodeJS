import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tbl_cust_category_2025', function(table) {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.string('Name', 100).notNullable().collate('utf8mb4_general_ci');
        table.string('Icon', 100).collate('utf8mb4_general_ci').nullable();
        table.string('Photo', 100).collate('utf8mb4_general_ci').nullable();
        table.string('Photo2', 255).collate('utf8mb4_general_ci').nullable();
        table.smallint('Featured').notNullable().defaultTo(0);
        table.integer('ProdType').notNullable().comment('0:custcat; 1:rawcat;');
        table.integer('Status').notNullable().defaultTo(1);
        table.float('srno', 14, 1).notNullable();
        table.dateTime('CreatedDate').notNullable();
        table.dateTime('ModifiedDate').nullable();
        table.integer('Roll').notNullable().defaultTo(1);
        table.integer('CreatedBy').notNullable();
        table.integer('ModifiedBy').notNullable();
        table.smallint('push_flag').notNullable().defaultTo(0);
        table.smallint('delete_flag').notNullable().defaultTo(0);
        table.dateTime('modified_time', { precision: 3 }).nullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('tbl_cust_category_2025');
}

