import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  // Guarda un usuario nuevo en la colección
  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioModel.create(createUsuarioDto);
  }

  // Devuelve todos los usuarios
  async findAll() {
    return this.usuarioModel.find();
  }

  // Busca UN usuario por su _id
  async findOne(id: string) {
    this.validarId(id);
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) {
      throw new NotFoundException(`No existe un usuario con el id ${id}`);
    }
    return usuario;
  }

  // Cambia los campos enviados y devuelve el usuario actualizado
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    this.validarId(id);
    const usuario = await this.usuarioModel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { returnDocument: 'after', runValidators: true },
    );
    if (!usuario) {
      throw new NotFoundException(`No existe un usuario con el id ${id}`);
    }
    return usuario;
  }

  // Elimina el usuario y confirma cuál fue
  async remove(id: string) {
    this.validarId(id);
    const usuario = await this.usuarioModel.findByIdAndDelete(id);
    if (!usuario) {
      throw new NotFoundException(`No existe un usuario con el id ${id}`);
    }
    return { mensaje: `${usuario.nombre} fue eliminado`, usuario };
  }

  // Revisa que el id tenga el formato de MongoDB
  private validarId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`"${id}" no es un id válido`);
    }
  }
}
