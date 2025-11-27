import Producto from "../schemas/productosSch.js";

class productoModel {
    async create(producto) {
        return await Producto.create(producto);
    }

    async getAll() {
    return await Producto.find()
        .lean() // ← Acelera muchísimo
        .populate({
            path: "Categoria",
            select: "Nombre -_id",
            options: { lean: true }
        })
        .populate({
            path: "UsuarioCreador",
            select: "Nombre Email -_id",
            options: { lean: true }
        });
}


    

    async getOneById(id) {
        return await Producto.findById(id)
            .populate("Categoria", "Nombre -_id");
    }

    async getByUsuario(idUsuario) {
        return await Producto.find({ UsuarioCreador: idUsuario })
            .populate("Categoria", "Nombre -_id"); 
    }

    async update(id, data) {
        return await Producto.findByIdAndUpdate(id, data, { new: true })
        .populate("UsuarioCreador", "Nombre Email")

    }

    async delete(id) {
        return await Producto.findByIdAndDelete(id);
    }
}

export default new productoModel();
