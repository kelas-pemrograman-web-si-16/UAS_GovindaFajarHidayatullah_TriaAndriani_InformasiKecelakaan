const mongoose = require('mongoose');
const beritaSchema = mongoose.Schema({
    WaktuKejadian      : {type: String, required: true, unique: true},
    NamaKorban         : String,
    AlamatKejadian     : String,
    KronologisKejadian : String
});
module.exports = mongoose.model('berita', beritaSchema);
