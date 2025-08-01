import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
const API_URL = import.meta.env.VITE_API_URL;
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all', // can be 'all', 'rent', or 'sale'
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSidebardata({
      searchTerm: urlParams.get('searchTerm') || '',
      type: urlParams.get('type') || 'all',
      parking: urlParams.get('parking') === 'true',
      furnished: urlParams.get('furnished') === 'true',
      offer: urlParams.get('offer') === 'true',
      sort: urlParams.get('sort') || 'createdAt',
      order: urlParams.get('order') || 'desc',
    });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${API_URL}/api/listing/get?${searchQuery}`);
      if (!res.ok) {
        setListings([]);
        setLoading(false);
        return;
      }
      const data = await res.json();

      setShowMore(data.length > 8);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === 'type') {
      setSidebardata((prev) => ({ ...prev, type: value }));
    } else if (id === 'searchTerm') {
      setSidebardata((prev) => ({ ...prev, searchTerm: value }));
    } else if (['parking', 'furnished', 'offer'].includes(id)) {
      setSidebardata((prev) => ({ ...prev, [id]: checked }));
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata((prev) => ({ ...prev, sort, order }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const res = await fetch(`${API_URL}/api/listing/get?${urlParams.toString()}`);
    if (!res.ok) return;
    const data = await res.json();
    setShowMore(data.length >= 9);
    setListings((prev) => [...prev, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label htmlFor='searchTerm' className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className='flex gap-4 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            {/* Use radios here for type selection */}
            {['all', 'rent', 'sale'].map((typeOption) => (
              <label key={typeOption} className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='type'
                  id='type'
                  value={typeOption}
                  checked={sidebardata.type === typeOption}
                  onChange={handleChange}
                />
                <span className='capitalize'>{typeOption === 'all' ? 'Rent & Sale' : typeOption}</span>
              </label>
            ))}
          </div>

          <div className='flex gap-4 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            {['parking', 'furnished', 'offer'].map((amenity) => (
              <label key={amenity} className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id={amenity}
                  checked={sidebardata[amenity]}
                  onChange={handleChange}
                />
                <span className='capitalize'>{amenity}</span>
              </label>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            <label htmlFor='sort_order' className='font-semibold'>
              Sort:
            </label>
            <select
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>

      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
          )}

          {!loading &&
            listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
