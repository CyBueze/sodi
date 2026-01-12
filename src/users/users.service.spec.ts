import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../common/roles.enum';

// 👇 Fake repository (only what the service uses)
const mockUsersRepo = {
  create: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('hashes password and creates an admin user', async () => {
    // Arrange
    mockUsersRepo.create.mockImplementation((data) => data);

    // Act
    const user = await service.create(
      'admin@test.com',
      'plainpassword',
    );

    // Assert
    expect(repo.create).toHaveBeenCalled();

    expect(user.email).toBe('admin@test.com');
    expect(user.role).toBe(Role.ADMIN);

    expect(user.password).not.toBe('plainpassword');
    expect(user.password).toBeDefined();
  });
});
