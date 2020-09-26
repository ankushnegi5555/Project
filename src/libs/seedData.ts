import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';
import * as bcrypt from 'bcrypt';

const userRepository = new UserRepository();
export default async function seedData() {
  const { password } = config;
  const hashPassword: string = await bcrypt.hash(password, 10);
  const ownerId = await userRepository.generateId();
  const Owner = {
    _id: ownerId,
    originalId: ownerId,
    name: 'Ankush Negi',
    email: 'ankush.negi@successive.tech',
    address: 'Noida',
    role: 'owner',
    dob: new Date('1998-04-25'),
    hobbies: ['football'],
    password: hashPassword,
    createdAt: new Date(),
    createdBy: ownerId
  };
  const userCount = await userRepository.count({ deletedAt: undefined });
  if (userCount === 0) {
    console.log('User is seeded');
    return await userRepository.create(Owner);

  } else {
    console.log('User is already seeded');
    console.log('Number of total users: ', userCount);
  }
}
