using System;

namespace SimpleTimeTracker 
{
    public class TimeEntryUpdateDTO
    {
        public DateTime StartDate {get; set; }

        public DateTime EndDate {get; set; }

        public string Notes {get; set; }    
    }
}