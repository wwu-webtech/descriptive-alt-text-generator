import {column, db, Inputs} from 'astro:db';
import { faker } from '@faker-js/faker';

export default async function() {
	for (let i = 0; i < 10; i++) {
		await db.insert(Inputs).values([
			{
				id: i,
				user: faker.internet.userName(),
				image: faker.image.url(),
				createdAt: faker.date.recent(),
				geminiResults: faker.lorem.sentence(),
				geminiTokensUsed: faker.number.int(),
				openAIResults: faker.lorem.sentence(),
				openAITokensUsed: faker.getMetadata(),
				isRefine: false,
			}
		])
	}
};
