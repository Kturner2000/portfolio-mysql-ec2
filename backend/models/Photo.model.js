const db = require('../lib/db');  // Import the database connection

const getAllPhotos = async () => {
  try {
    const [rows, fields] = await db.execute('SELECT id, src, alt,category, created_at FROM photographs ORDER BY created_at DESC');
    return rows;
  } catch (err) {
    throw new Error('Error fetching photos: ' + err.message);
  }
};

const uploadPhoto = async ({src, alt, category} ) => {
  try {
    const [result] = await db.execute(`
      INSERT INTO photographs (src, alt, category) VALUES (?, ?, ?)`,[
        src, alt, category]);

     console.log(result)
  
    return result
  
  } catch (err) {
    throw new Error('Error uploading photo: ' + err.message);
  }
}

const getPhotosByCategory = async(category) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM photographs WHERE category = ? ORDER BY created_at DESC', [category]);
    return rows;
  } catch (err) {
    throw new Error('Error fetching photos: ' + err.message);
  }
}

const getPhotoById = async(id) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM photographs WHERE id = ?', [id]);
    return rows[0];
  } catch (err) {
    throw new Error('Error fetching photo: ' + err.message);
  }
}


module.exports = {getAllPhotos, uploadPhoto, getPhotosByCategory, getPhotoById}