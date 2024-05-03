import { defineDb, defineTable, column } from 'astro:db';

const Inputs = defineTable({
	columns: {
		id: column.number({ primaryKey: true}),
		user: column.text(),
		image: column.text(),
		createdAt: column.date(),
		geminiResults: column.text(),
		geminiTokensUsed: column.number({ optional: true }),
		openAIResults: column.text(),
		openAITokensUsed: column.json(),
		isRefine: column.boolean(),
	},
	indexes: [
		{on: ["id"], unique: true},
	]
})

export default defineDb({
	tables: { Inputs },
})
