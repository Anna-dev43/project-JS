export const apiURL = 'http://localhost:3000/api/clients';
const $headerInput = document.getElementById('header-inp');

export const getClients = async () => {
  const response = await fetch(apiURL);
  const clientsRaw = await response.json();

  return clientsRaw;
};

export const saveClient = async (newClient) => {
  const serverData = await fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newClient),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let data = {
    ok: serverData.ok
  };

  try {
    data.answer = await serverData.json();
  } catch {    
    console.log('Invalid JSON');
  }

  return data;
};

export const removeClient = async (newClient) => {
  await fetch(`${apiURL}/${newClient.id}`, {
    method: 'DELETE',
  });
};

export const getChangeClient = async (newClient) => {
  await fetch(`${apiURL}/${newClient.id}`, {
    method: 'GET',
  });
};

export const searchClient = async () => {
  const searchQuery = $headerInput.value.trim();

  const serverData = await fetch(`${apiURL}?search=${searchQuery}`, {
    method: 'GET',
  });
  const data = await serverData.json();

  return data;
};

export const changeClient = async (newClient, id) => {
  const serverData = await fetch(`${apiURL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(newClient),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  let data = {
    ok: serverData.ok
  };

  try {
    data.answer = await serverData.json();
  } catch {
    console.log('Invalid JSON');
  }

  return data; 
};
