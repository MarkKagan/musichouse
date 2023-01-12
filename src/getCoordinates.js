async function getCoordinates({
  country,
  city,
  street,
  houseNumber,
  postalCode,
}) {
  try {
    const response = await fetch( `https://nominatim.openstreetmap.org/search?house=${houseNumber}&city=${city}&country=${country}&street=${street}&postalcode=${postalCode}&format=json`)
    const data = await response.json();
    const coordinates = [Number(data[0].lat), Number(data[0].lon)];
    return coordinates; 
  } catch (error) {
    console.log(error);
  }
}

export default getCoordinates;
