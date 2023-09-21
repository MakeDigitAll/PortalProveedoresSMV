const pool = require('../database')

/*
async function updateUserImage(id, image) {
  try {
    await pool.query('UPDATE "userImages" SET "image" = $1 WHERE "userId" = $2', [image, id]);
    return 'Imagen actualizada';
  } catch (error) {
    throw new Error('Error al actualizar la imagen');
  }
}
*/

async function getImageUser(id) {
  try {
    const image = await pool.query('SELECT "image" FROM "userImages" WHERE "userId" = $1', [id]);
    if (image.rows.length === 0) {
      throw new Error('No existe una imagen para este usuario');
    }
    return image.rows[0].image;
  } catch (error) {
    throw new Error('Error al obtener la imagen');
  }
}

async function deleteImageUser(id) {
  try {
    await pool.query('UPDATE "userImages" SET "image" = null WHERE "userId" = $1', [id]);
    return 'Imagen eliminada';
  } catch (error) {
    throw new Error('Error al eliminar la imagen');
  }
}


module.exports = {
  getImageUser,
  deleteImageUser
}