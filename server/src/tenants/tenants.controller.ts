import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('tenants')
@ApiBearerAuth('access-token')
@Controller('admin/tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @ApiOperation({ summary: 'Create a tenant' })
  @ApiOkResponse({ description: 'Tenant created successfully.' })
  @Post()
  async create(@Body() dto: CreateTenantDto) {
    const data = await this.tenantsService.createTenant(dto);
    return { success: true, data };
  }

  @ApiOperation({ summary: 'List tenants' })
  @ApiOkResponse({ description: 'List of tenants returned successfully.' })
  @Get()
  async findAll() {
    const data = await this.tenantsService.getTenants();
    return { success: true, data };
  }

  @ApiOperation({ summary: 'Update tenant by id' })
  @ApiOkResponse({ description: 'Tenant updated successfully.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    const data = await this.tenantsService.updateTenant(id, dto);
    return { success: true, data };
  }

  @ApiOperation({ summary: 'Delete tenant by id' })
  @ApiOkResponse({ description: 'Tenant removed successfully.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.tenantsService.deleteTenant(id);
    return { success: true, data };
  }
}
