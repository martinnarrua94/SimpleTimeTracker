using System;

namespace SimpleTimeTracker 
{
    public class TimeEntryUpdateDTO
    {
        public DateTimeOffset? StartDate {get; set; }

        public DateTimeOffset? EndDate {get; set; }

        public string Notes {get; set; }    
    }
}