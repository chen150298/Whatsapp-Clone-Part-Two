using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class RatingService : IRatingService
    {
        private static List<Rating> _ratings;

        public RatingService(List<Rating> ratings)
        {
            _ratings = ratings;
        }
        public void Add(Rating rating)
        {
            _ratings.Add(rating);
        }

        public double Avg()
        {
            if( _ratings.Count == 0 ) { return 0; }

            double total=0;
            foreach(Rating rating in _ratings)
            {
                total += rating.Rate;
            }
            return total/_ratings.Count;

        }

        public void Delete(int id)
        {
            var rating= Get(id);
            if(rating == null) { return; } 
            _ratings.Remove(rating);
        }

        public void Edit(Rating rating)
        {
            var r = Get(rating.Id);
            if(r == null) { return; }
            r.Username= rating.Username;
            r.Rate= rating.Rate;
            r.Content=rating.Content;
        }

        public Rating? Get(int? id)
        {
            if (id == null)
            {
                return null;
            }
            var rating = _ratings.FirstOrDefault(r => r.Id == id); 
            if( rating == null ) { return null; }
            return rating;
        }

        public List<Rating> GetAll()
        {
            return _ratings;
        }

        public bool RatingExists(int id)
        {
            return Get(id) != null;
        }

        public List<Rating> Search(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return GetAll();
            }
            var found=_ratings.Where(r=> r.Username.Contains(query)|| r.Content.Contains(query));
            return found.ToList();
        }
    }
}
