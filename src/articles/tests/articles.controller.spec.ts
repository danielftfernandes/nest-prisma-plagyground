import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from '../articles.controller';
import { ArticlesService } from '../articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findDrafts: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const createArticleDto = {
        title: 'Test',
        body: 'Test Content',
        published: false,
      };
      const articleEntity = {
        id: 1,
        ...createArticleDto,
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(articleEntity);

      expect(await controller.create(createArticleDto)).toEqual(articleEntity);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.create).toHaveBeenCalledWith(createArticleDto);
    });
  });

  describe('findDrafts', () => {
    it('should return an array of draft articles', async () => {
      const result = [
        {
          id: 1,
          title: 'Draft 1',
          body: 'Content 1',
          description: null,
          published: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Draft 2',
          body: 'Content 2',
          description: null,
          published: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findDrafts').mockResolvedValue(result);

      expect(await controller.findDrafts()).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findDrafts).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result = [
        {
          id: 1,
          title: 'Article 1',
          body: 'Content 1',
          description: null,
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Article 2',
          body: 'Content 2',
          description: null,
          published: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single article by id', async () => {
      const id = '1';
      const result = {
        id: 1,
        title: 'Article 1',
        body: 'Content 1',
        description: null,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should convert string id to number', async () => {
      const id = '42';
      jest.spyOn(service, 'findOne').mockResolvedValue({} as any);
      await controller.findOne(id);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.findOne).toHaveBeenCalledWith(42);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const id = '1';
      const updateArticleDto = { title: 'Updated Title' };
      const result = {
        id: 1,
        title: 'Updated Title',
        body: 'Content',
        description: null,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateArticleDto)).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.update).toHaveBeenCalledWith(1, updateArticleDto);
    });
  });

  describe('remove', () => {
    it('should remove an article', async () => {
      const id = '1';
      const result = {
        id: 1,
        title: 'Article 1',
        body: 'Content 1',
        description: null,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
