import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("tbl_units_2025").del();

    // Inserts seed entries
    await knex("tbl_units_2025").insert([
        { id: 1, Name: "Gm", Name2: "", Status: 1, roll: 0 },
    { id: 2, Name: "Ml", Name2: "", Status: 1, roll: 0 },
    { id: 3, Name: "Pieces", Name2: "Pieces", Status: 1, roll: 0 },
    { id: 4, Name: "Kg", Name2: null, Status: 1, roll: 0 },
    { id: 5, Name: "Box", Name2: null, Status: 1, roll: 0 },
    ]);
};
