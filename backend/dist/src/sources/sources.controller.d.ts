import { SourcesService } from './sources.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
export declare class SourcesController {
    private readonly sourcesService;
    constructor(sourcesService: SourcesService);
    findAll(): Promise<any>;
    create(createSourceDto: CreateSourceDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateSourceDto: UpdateSourceDto): Promise<any>;
    remove(id: string): Promise<any>;
}
