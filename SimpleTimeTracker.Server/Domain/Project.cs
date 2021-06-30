using System.Collections.Generic;

namespace SimpleTimeTracker
{
    public class Project : BaseEntity
    {
        public Project()
        { 
        }
        
        public Project(string name, string notes)
        {
            this.Name = name;
            this.Notes = notes;
        }
        
        public string Name { get; private set; }

        public string Notes { get; private set; }

        public bool Active { get; private set; } = true;

        public ICollection<ProjectTask> ProjectTasks { get; set; }

        public void ChangeName(string newName)
        {
           if (!string.IsNullOrEmpty(newName)) this.Name = newName;         
        }

        public void ChangeNotes(string newNotes)
        {
           if (!string.IsNullOrEmpty(newNotes)) this.Notes = newNotes;         
        }

        public void LogicDelete()
        {
            this.Active = false;
        }
    }
}