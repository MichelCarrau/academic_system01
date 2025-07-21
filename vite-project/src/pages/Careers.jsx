import React, { useEffect, useState } from 'react';

function Careers() {
  const [careers, setCareers] = useState([]);
  const [newCareer, setNewCareer] = useState({
    career_name: '',
    career_code: '',
    description: '',
    four_quarter_duration: '',
    modality: '',
    creation_date: '',
    active: true,
    coordinator: {
      name: '',
      email: '',
    },
  });

  const [editingCareerId, setEditingCareerId] = useState(null);
  const [editingCareer, setEditingCareer] = useState(null);

  useEffect(() => {
    fetch('/api/careers')
      .then((res) => res.json())
      .then((data) => setCareers(data))
      .catch((err) => console.error('Error fetching careers:', err));
  }, []);

  // handleChange que detecta si está editando o creando
  const handleChange = (e) => {
    const { name, value } = e.target;

    const setter = editingCareerId ? setEditingCareer : setNewCareer;
    const state = editingCareerId ? editingCareer : newCareer;

    if (name.startsWith('coordinator.')) {
      const key = name.split('.')[1];
      setter({
        ...state,
        coordinator: {
          ...state.coordinator,
          [key]: value,
        },
      });
    } else if (name === 'active') {
      setter({
        ...state,
        active: value === 'true',
      });
    } else {
      setter({
        ...state,
        [name]: value,
      });
    }
  };

  // Crear carrera
  const handleSubmit = (e) => {
    e.preventDefault();

    const careerToSend = {
      ...newCareer,
      four_quarter_duration: Number(newCareer.four_quarter_duration),
      creation_date: newCareer.creation_date ? new Date(newCareer.creation_date) : null,
    };

    fetch('/api/careers/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(careerToSend),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error creando la carrera');
        return res.json();
      })
      .then((data) => {
        setCareers((prev) => [...prev, data]);
        setNewCareer({
          career_name: '',
          career_code: '',
          description: '',
          four_quarter_duration: '',
          modality: '',
          creation_date: '',
          active: true,
          coordinator: { name: '', email: '' },
        });
      })
      .catch((err) => console.error('Error creating career:', err));
  };

  // Eliminar carrera
  const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro que quieres eliminar esta carrera?')) return;

    fetch(`/api/careers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error eliminando la carrera');
        return res.json();
      })
      .then((data) => {
        if (data.message === 'Career deleted') {
          setCareers((prev) => prev.filter((career) => career._id !== id));
        } else {
          alert(data.message || 'Error al eliminar la carrera');
        }
      })
      .catch((err) => console.error('Error deleting career:', err));
  };

  // Empezar edición - prepara el estado para el formulario de edición
  const startEditing = (career) => {
    setEditingCareerId(career._id);
    setEditingCareer({
      ...career,
      creation_date: career.creation_date
        ? new Date(career.creation_date).toISOString().substr(0, 10)
        : '',
      four_quarter_duration: career.four_quarter_duration || '',
      coordinator: {
        name: career.coordinator?.name || '',
        email: career.coordinator?.email || '',
      },
    });
  };

  // Cancelar edición
  const cancelEditing = () => {
    setEditingCareerId(null);
    setEditingCareer(null);
  };

  // Guardar edición
  const saveEditing = (e) => {
    e.preventDefault();

    const careerToSend = {
      ...editingCareer,
      four_quarter_duration: Number(editingCareer.four_quarter_duration),
      creation_date: editingCareer.creation_date ? new Date(editingCareer.creation_date) : null,
    };

    fetch(`/api/careers/${editingCareerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(careerToSend),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error actualizando la carrera');
        return res.json();
      })
      .then((data) => {
        setCareers((prev) =>
          prev.map((career) => (career._id === editingCareerId ? data : career))
        );
        cancelEditing();
      })
      .catch((err) => console.error('Error updating career:', err));
  };

  return (
    <div>
      <h1>Carreras</h1>

      {/* Form para nueva carrera */}
      {!editingCareerId && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <h2>Añadir nueva carrera</h2>
          <input
            type="text"
            name="career_name"
            placeholder="Nombre"
            value={newCareer.career_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="career_code"
            placeholder="Código"
            value={newCareer.career_code}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={newCareer.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="four_quarter_duration"
            placeholder="Duración (cuatrimestres)"
            value={newCareer.four_quarter_duration}
            onChange={handleChange}
          />
          <input
            type="text"
            name="modality"
            placeholder="Modalidad"
            value={newCareer.modality}
            onChange={handleChange}
          />
          <input
            type="date"
            name="creation_date"
            placeholder="Fecha de creación"
            value={newCareer.creation_date}
            onChange={handleChange}
          />
          <select name="active" value={newCareer.active ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Activa</option>
            <option value="false">Inactiva</option>
          </select>
          <input
            type="text"
            name="coordinator.name"
            placeholder="Nombre del coordinador"
            value={newCareer.coordinator.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="coordinator.email"
            placeholder="Email del coordinador"
            value={newCareer.coordinator.email}
            onChange={handleChange}
          />

          <button type="submit">Guardar carrera</button>
        </form>
      )}

      {/* Form para editar carrera */}
      {editingCareerId && editingCareer && (
        <form onSubmit={saveEditing} style={{ marginBottom: '2rem' }}>
          <h2>Editar carrera</h2>
          <input
            type="text"
            name="career_name"
            placeholder="Nombre"
            value={editingCareer.career_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="career_code"
            placeholder="Código"
            value={editingCareer.career_code}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={editingCareer.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="four_quarter_duration"
            placeholder="Duración (cuatrimestres)"
            value={editingCareer.four_quarter_duration}
            onChange={handleChange}
          />
          <input
            type="text"
            name="modality"
            placeholder="Modalidad"
            value={editingCareer.modality}
            onChange={handleChange}
          />
          <input
            type="date"
            name="creation_date"
            placeholder="Fecha de creación"
            value={editingCareer.creation_date}
            onChange={handleChange}
          />
          <select name="active" value={editingCareer.active ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Activa</option>
            <option value="false">Inactiva</option>
          </select>
          <input
            type="text"
            name="coordinator.name"
            placeholder="Nombre del coordinador"
            value={editingCareer.coordinator.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="coordinator.email"
            placeholder="Email del coordinador"
            value={editingCareer.coordinator.email}
            onChange={handleChange}
          />

          <button type="submit">Guardar cambios</button>
          <button type="button" onClick={cancelEditing} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </form>
      )}

      {/* Lista de carreras */}
      {careers.map((career) => (
        <div key={career._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>{career.career_name}</h2>
          <p><strong>Código:</strong> {career.career_code}</p>
          <p><strong>Descripción:</strong> {career.description}</p>
          <p><strong>Duración (cuatrimestres):</strong> {career.four_quarter_duration}</p>
          <p><strong>Modalidad:</strong> {career.modality}</p>
          <p><strong>Fecha de creación:</strong> {career.creation_date ? new Date(career.creation_date).toLocaleDateString() : ''}</p>
          <p><strong>Activa:</strong> {career.active ? 'Sí' : 'No'}</p>
          {career.coordinator && (
            <>
              <p><strong>Coordinador:</strong> {career.coordinator.name}</p>
              <p><strong>Email del coordinador:</strong> {career.coordinator.email}</p>
            </>
          )}
          <button onClick={() => startEditing(career)} style={{ marginRight: '10px' }}>
            Editar
          </button>
          <button onClick={() => handleDelete(career._id)} style={{ color: 'red' }}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Careers;
