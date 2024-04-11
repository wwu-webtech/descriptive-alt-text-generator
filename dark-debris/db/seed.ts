import { db, Inputs } from 'astro:db';
import { faker } from '@faker-js/faker';

export default async function() {
	for (let i = 0; i < 10; i++) {
		await db.insert(Inputs).values([
			{
				id: i,
				user: faker.internet.userName(),
				image: faker.image.url(),
				createdAt: faker.date.recent(),
				generatedAltText: faker.lorem.text(),
				refineAttempts: faker.number.int({ min: 0, max: 10})
			}
		])
	}
};
