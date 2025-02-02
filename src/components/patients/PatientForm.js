// components/patients/PatientForm.js
const PatientForm = ({ patient }) => {
    const [formData, setFormData] = useState(patient || {});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await api.post('/patients', formData);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Nom"
          className="input input-bordered w-full"
          value={formData.nom}
          onChange={(e) => setFormData({...formData, nom: e.target.value})}
        />
        {/* Ajouter autres champs */}
      </form>
    );
  };