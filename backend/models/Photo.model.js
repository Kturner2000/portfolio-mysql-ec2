const db = require('../lib/db');  // Import the database connection

const getAllPhotos = async () => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM photographs');
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
    const [rows, fields] = await db.execute('SELECT * FROM photographs WHERE category = ?', [category]);
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