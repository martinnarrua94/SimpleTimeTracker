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
    public class ProjectsController : ControllerBase
    {
        private IGenericRepository<Project> projectRepository;
        private IMapper mapper;

        public ProjectsController(IGenericRepository<Project> projectRepository, IMapper mapper)
        {
            this.projectRepository = projectRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<ProjectDTO> GetAll()
        {
            var activeFilter = new List<Expression<Func<Project, bool>>>()
            { 
                x => x.Active
            };

            var projects = this.projectRepository.Get(filter: activeFilter).ToList();

            return mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }

        [HttpGet("{id}")]
        public ActionResult<ProjectDTO> GetById(long id)
        {
            var project = projectRepository.GetByID(id);
            
            var projectDTO = mapper.Map<ProjectDTO>(project);
            
            return Ok(projectDTO);       
        }

        [HttpPost]
        public ActionResult<ProjectDTO> Post(ProjectUpdateDTO projectData)
        {
            var project = new Project(name: projectData.Name, notes: projectData.Notes);

            this.projectRepository.Insert(project);
            this.projectRepository.Save();

            return GetById(project.Id);
        }

        [HttpPut("{id}")]
        public ActionResult<ProjectDTO> Update(ProjectUpdateDTO projectData, long id)
        {
            var project = projectRepository.GetByID(id);

            project.ChangeName(projectData.Name);
            project.ChangeNotes(projectData.Notes);

            this.projectRepository.Update(project);
            this.projectRepository.Save();

            return GetById(project.Id);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            var project = projectRepository.GetByID(id);

            project.LogicDelete();

            this.projectRepository.Update(project);
            this.projectRepository.Save();

            return Ok();
        }
    }
}