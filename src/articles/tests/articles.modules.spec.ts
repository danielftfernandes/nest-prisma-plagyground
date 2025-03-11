import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesModule } from '../articles.module';
import { ArticlesController } from '../articles.controller';
import { ArticlesService } from '../articles.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('ArticlesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ArticlesModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should register ArticlesController', () => {
    const controller = module.get<ArticlesController>(ArticlesController);
    expect(controller).toBeDefined();
  });

  it('should register ArticlesService', () => {
    const service = module.get<ArticlesService>(ArticlesService);
    expect(service).toBeDefined();
  });

  it('should import PrismaModule', () => {
    const imports = Reflect.getMetadata(
      'imports',
      ArticlesModule,
    ) as Array<any>;
    expect(imports).toContain(PrismaModule);
  });

  it('should provide ArticlesController as a controller', () => {
    const controllers = Reflect.getMetadata(
      'controllers',
      ArticlesModule,
    ) as Array<any>;
    expect(controllers).toContain(ArticlesController);
  });

  it('should provide ArticlesService as a provider', () => {
    const providers = Reflect.getMetadata(
      'providers',
      ArticlesModule,
    ) as Array<any>;
    expect(providers).toContain(ArticlesService);
  });
});
