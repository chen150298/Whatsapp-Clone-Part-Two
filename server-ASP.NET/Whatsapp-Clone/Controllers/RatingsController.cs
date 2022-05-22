using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Whatsapp_Clone.Controllers
{
    public class RatingsController : Controller
    {
        private readonly IRatingService _service;

        public RatingsController(IRatingService service)
        {
            this._service = service;
        }

        // GET: Ratings
        public  IActionResult Index()
        {
            var avg =  _service.Avg();
            ViewBag.Avg = avg;
            return View(_service.GetAll());
        }

        public  IActionResult SearchResults(string query)
        {

            return Json(_service.Search(query));
        }

        // GET: Ratings/Details/5
        public  IActionResult Details(int? id)
        {
            var rating = _service.Get(id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public  IActionResult Create([Bind("Id,Username,Rate,Content,Date")] Rating rating)
        {
            if (ModelState.IsValid)
            {
                _service.Add(rating);
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public  IActionResult Edit(int? id)
        {
            var rating = _service.Get(id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,Username,Rate,Content,Date")] Rating rating)
        {
            if (id != rating.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if (!_service.RatingExists(rating.Id))
                {
                    return NotFound();
                }
                _service.Edit(rating);
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public  IActionResult Delete(int? id)
        {
            var rating =  _service.Get(id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _service.Delete(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
