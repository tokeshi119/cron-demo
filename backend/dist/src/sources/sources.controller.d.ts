import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
export declare class SourcesController {
    private readonly sourcesService;
    constructor(sourcesService: SourcesService);
    findAll(): Promise<{
        url: string;
        name: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(createSourceDto: CreateSourceDto): Promise<{
        url: string;
        name: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        url: string;
        name: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateSourceDto: UpdateSourceDto): Promise<{
        url: string;
        name: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        url: string;
        name: string;
        enabled: boolean;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
