import knex, { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('task', (table) => {
        table.uuid('id').primary()
        table.text('name').notNullable()
        table.text('task').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('task')
}

