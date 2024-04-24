import { defineDb, defineTable, column } from 'astro:db';

const Inputs = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		user: column.text(),
		image: column.text(),
		createdAt: column.date(),
		generatedAltText: column.json(),
		refineAttempts: column.number(),
	}
})

export default defineDb({
	tables: { Inputs },
})
