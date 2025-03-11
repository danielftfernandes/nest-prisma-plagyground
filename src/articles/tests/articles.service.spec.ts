import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from '../articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: PrismaService,
          useValue: {
            article: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create an article', async () => {
    const createArticleDto = {
      title: 'Test',
      content: 'Test content',
      body: 'Test body',
      published: false,
    } as CreateArticleDto;

    (prismaService.article.create as jest.Mock).mockResolvedValue(
      createArticleDto,
    );

    const result = await service.create(createArticleDto);
    expect(result).toEqual(createArticleDto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaService.article.create).toHaveBeenCalledWith({
      data: createArticleDto,
    });
  });

  it('should find all published articles', async () => {
    const articles = [
      { id: 1, title: 'Test', content: 'Test content', published: true },
    ];
    (prismaService.article.findMany as jest.Mock).mockResolvedValue(articles);

    const result = await service.findAll();
    expect(result).toEqual(articles);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaService.article.findMany).toHaveBeenCalledWith({
      where: { published: true },
    });
  });

  it('should find a single article by id', async () => {
    const article = {
      id: 1,
      title: 'Test',
      content: 'Test content',
      published: true,
    };
    (prismaService.article.findUnique as jest.Mock).mockResolvedValue(article);

    const result = await service.findOne(1);
    expect(result).toEqual(article);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaService.article.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update an article', async () => {
    const updateArticleDto = {
      title: 'Updated Test',
      content: 'Updated content',
      published: true,
    } as UpdateArticleDto;

    const updatedArticle = { id: 1, ...updateArticleDto };
    (prismaService.article.update as jest.Mock).mockResolvedValue(
      updatedArticle,
    );

    const result = await service.update(1, updateArticleDto);
    expect(result).toEqual(updatedArticle);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaService.article.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateArticleDto,
    });
  });

  it('should delete an article', async () => {
    const deletedArticle = {
      id: 1,
      title: 'Test',
      content: 'Test content',
      published: true,
    };
    (prismaService.article.delete as jest.Mock).mockResolvedValue(
      deletedArticle,
    );

    const result = await service.remove(1);
    expect(result).toEqual(deletedArticle);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaService.article.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should find all draft articles', async () => {
    const drafts = [
      {
        id: 1,
        title: 'Draft Test',
        content: 'Draft content',
        published: false,
      },
    ];
    (prismaService.article.findMany as jest.Mock).mockResolvedValue(drafts);

    const result = await service.findDrafts();
    expect(result).toEqual(drafts);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prismaService.article.findMany).toHaveBeenCalledWith({
      where: { published: false },
    });
  });
});
