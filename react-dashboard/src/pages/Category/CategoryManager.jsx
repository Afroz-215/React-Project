// import React, { useEffect, useState } from 'react';
// import {
//     addCategory,
//     updateCategory,
//     deleteCategory,
//     viewCategory,
//     listOfCategories
// } from './CategoryService';

// const CategoryManager = () => {
//     const [categories, setCategories] = useState([]);
//     const [formData, setFormData] = useState({ name: '' });
//     const [editId, setEditId] = useState(null);

//     const fetchCategories = async () => {
//         try {
//             const res = await listOfCategories();
//             console.log("API Response:", res.data);
//             setCategories(res.data.categories || []);
//         } catch (err) {
//             console.error('Error loading categories', err);
//         }
//     };



//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, name: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log("Submitting form data:", formData);

//         try {
//             if (editId) {
//                 await updateCategory(editId, formData);
//             } else {
//                 await addCategory({name :formData.name});
//                 setFormData({ name: '' });
//                 fetchCategories();
//             }
//             setFormData({ name: '' });
//             setEditId(null);
//             fetchCategories();
//         } catch (err) {
//             console.error('Error submitting category', err);
//         }
//     };

//     const handleEdit = async (id) => {
//         try {
//             const res = await viewCategory(id);
//             setFormData({ name: res.data.name });
//             setEditId(id);
//         } catch (err) {
//             console.error('Error viewing category', err);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure?')) return;
//         try {
//             await deleteCategory(id);
//             fetchCategories();
//         } catch (err) {
//             console.error('Error deleting category', err);
//         }
//     };

//     return (
//         <div style={{ padding: '2rem' }}>
//             <h2>{editId ? 'Edit Category' : 'Add Category'}</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Category name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />
//                 <button type="submit">{editId ? 'Update' : 'Add'}</button>
//                 {editId && <button onClick={() => { setEditId(null); setFormData({ name: '' }); }}>Cancel</button>}
//             </form>

//             <hr />

//             <h3>Category List</h3>
//             <ul>
//                 {categories.length === 0 ? (
//                     <p>No categories found.</p>
//                 ) : (
//                     categories.map((cat) => (
//                         <li key={cat.id}>{cat.name}
//                             {' '}
//                             <button onClick={() => handleEdit(cat.id)}>Edit</button>{' '}
//                             <button onClick={() => handleDelete(cat.id)}>Delete</button></li>
//                     ))
//                 )}
//             </ul>

//         </div>
//     );
// };

// export default CategoryManager;


import React, { useEffect, useState } from 'react';
import {
    addCategory,
    updateCategory,
    deleteCategory,
    viewCategory,
    listOfCategories
} from './CategoryService';
import CategoryDropdown from './CategoryDropdown';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '' });
    const [editId, setEditId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await listOfCategories();
            console.log("API Response:", res.data);
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error('Error loading categories', err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, name: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting form data:", formData);

        try {
            if (editId) {
                await updateCategory(editId, formData);
            } else {
                await addCategory({ name: formData.name });
                setFormData({ name: '' });
                fetchCategories();
            }
            setFormData({ name: '' });
            setEditId(null);
            fetchCategories();
        } catch (err) {
            console.error('Error submitting category', err);
        }
    };

    const handleEdit = async (id) => {
        try {
            const res = await viewCategory(id);
            setFormData({ name: res.data.name });
            setEditId(id);
        } catch (err) {
            console.error('Error viewing category', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await deleteCategory(id);
            fetchCategories();
        } catch (err) {
            console.error('Error deleting category', err);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>{editId ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Category name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
                {editId && <button onClick={() => { setEditId(null); setFormData({ name: '' }); }}>Cancel</button>}
            </form>

            <hr />

            <h3>Category List</h3>
            <ul>
                {categories.length === 0 ? (
                    <p>No categories found.</p>
                ) : (
                    categories.map((cat) => (
                        <li key={cat.id}>{cat.name}
                            {' '}
                            <button onClick={() => handleEdit(cat.id)}>Edit</button>{' '}
                            <button onClick={() => handleDelete(cat.id)}>Delete</button></li>
                    ))
                )}
            </ul>

           
            <hr />
            <h4>Select Category from Dropdown (Preview)</h4>
            <CategoryDropdown onSelect={(id) => {
                console.log("Selected ID from dropdown:", id);
            }} />
        </div>
    );
};

export default CategoryManager;
