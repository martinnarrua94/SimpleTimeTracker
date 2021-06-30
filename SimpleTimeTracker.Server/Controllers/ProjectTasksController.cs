using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace SimpleTimeTracker 
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectTasksController : ControllerBase
    {
        private IGenericRepository<ProjectTask> projectTaskRepository;
        private IGenericRepository<Project> projectRepository;
        private IMapper mapper;

        private const string IncludeProperties = "Project,TimeEntries";

        public ProjectTasksController(
            IGenericRepository<ProjectTask> projectTaskRepository,
            IGenericRepository<Project> projectRepository,
            IMapper mapper)
        {
            this.projectTaskRepository = projectTaskRepository;
            this.projectRepository = projectRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<ProjectTaskDTO> GetAll()
        {
            var activeFilter = new List<Expression<Func<ProjectTask, bool>>>()
            { 
                x => x.Active,
                x => x.Project.Active 
            };

            var projectTasks = this.projectTaskRepository.Get(
                includeProperties: IncludeProperties,
                filter: activeFilter)
                .ToList();

            return mapper.Map<IEnumerable<ProjectTaskDTO>>(projectTasks);
        }

        [HttpGet("{id}")]
        public ActionResult<ProjectTaskDTO> GetById(long id)
        {
            var projectTask = projectTaskRepository.GetByID(id, includeProperties: IncludeProperties);
            
            var projectTaskDTO = mapper.Map<ProjectTaskDTO>(projectTask);
            
            return Ok(projectTaskDTO);       
        }

        [HttpPost]
        public ActionResult<ProjectTaskDTO> Post(ProjectTaskCreateDTO projectTaskData)
        {
            var project = projectRepository.GetByID(projectTaskData.ProjectId);

            var projectTask = new ProjectTask(project: project,
                                            name: projectTaskData.Name,
                                            notes: projectTaskData.Notes);

            this.projectTaskRepository.Insert(projectTask);
            this.projectTaskRepository.Save();

            return GetById(projectTask.Id);
        }

        [HttpPut("{id}")]
        public ActionResult<ProjectTaskDTO> Update(ProjectTaskUpdateDTO projectTaskData, long id)
        {
            var projectTask = projectTaskRepository.GetByID(id);

            projectTask.ChangeName(projectTaskData.Name);
            projectTask.ChangeNotes(projectTaskData.Notes);

            this.projectTaskRepository.Update(projectTask);
            this.projectTaskRepository.Save();

            return GetById(projectTask.Id);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            var projectTask = projectTaskRepository.GetByID(id);

            projectTask.LogicDelete();

            this.projectTaskRepository.Update(projectTask);
            this.projectTaskRepository.Save();

            return Ok();
        }
    }
}