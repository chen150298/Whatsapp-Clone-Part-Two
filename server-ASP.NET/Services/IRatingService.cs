using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRatingService
    {
        public List<Rating> GetAll();


        public Rating? Get(int? id);



        public void Add(Rating rating);


        public void Edit(Rating rating);



        public void Delete(int id);


        public bool RatingExists(int id);

        public double Avg();

        public List<Rating> Search(string query);
    }
}
