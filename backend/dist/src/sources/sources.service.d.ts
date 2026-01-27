import { PrismaService } from '../prisma/prisma.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
export declare class SourcesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createSourceDto: CreateSourceDto): Promise<any>;
    update(id: string, updateSourceDto: UpdateSourceDto): Promise<any>;
    remove(id: string): Promise<any>;
}
