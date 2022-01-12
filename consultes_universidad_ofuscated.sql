SELECT DISTINCT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'alumno';
SELECT DISTINCT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'alumno' AND telefono IS NULL;
SELECT DISTINCT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'alumno' AND LEFT(fecha_nacimiento, 4) = '1999';
SELECT DISTINCT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'profesor' AND telefono IS NULL AND RIGHT(nif, 1) = 'k';
SELECT id, nombre, creditos, tipo, id_profesor FROM asignatura WHERE cuatrimestre = 1 AND curso = 3 AND id_grado = 7;
SELECT apellido1, apellido2, per.nombre, d.nombre AS departamento FROM profesor pro, persona per, departamento d WHERE pro.id_profesor = per.id AND pro.id_departamento = d.id ORDER BY apellido1, apellido2, per.nombre;
SELECT a.nombre, c.anyo_inicio, c.anyo_fin FROM alumno_se_matricula_asignatura mat, persona p, asignatura a, curso_escolar c WHERE p.nif = '26902806M' AND mat.id_alumno = p.id AND mat.id_asignatura = a.id AND mat.id_curso_escolar = c.id;
SELECT DISTINCT d.nombre FROM departamento d, profesor p, asignatura a, grado g WHERE g.nombre = 'Grado en Ingeniería Informática (Plan 2015)' AND g.id = a.id_grado AND a.id_profesor = p.id_profesor AND p.id_departamento = d.id;
SELECT DISTINCT p.* FROM persona p, alumno_se_matricula_asignatura m, curso_escolar c WHERE p.id = m.id_alumno AND m.id_curso_escolar = c.id AND c.anyo_inicio = '2018';
SELECT d.nombre AS departamento, apellido1, apellido2, per.nombre FROM persona per LEFT JOIN profesor pro ON per.id = pro.id_profesor LEFT JOIN departamento d ON pro.id_departamento = d.id WHERE per.tipo = 'profesor' ORDER BY d.nombre, apellido1, apellido2, per.nombre;
SELECT per.nombre, apellido1, apellido2 FROM persona per LEFT JOIN profesor pro ON per.id = pro.id_profesor WHERE per.tipo = 'profesor' AND pro.id_departamento IS NULL;
SELECT d.* FROM departamento d LEFT JOIN profesor p ON d.id = p.id_departamento WHERE id_profesor IS NULL;
SELECT DISTINCT per.* FROM persona per LEFT JOIN asignatura a ON per.id = a.id_profesor WHERE per.tipo = 'profesor' AND a.id IS NULL;
SELECT * FROM asignatura WHERE id_profesor IS NULL;
SELECT * FROM departamento WHERE id NOT IN ( SELECT d.id FROM departamento d JOIN profesor p ON d.id = p.id_departamento JOIN asignatura a ON p.id_profesor = a.id_profesor );
SELECT COUNT(*) FROM persona WHERE tipo = 'alumno';
SELECT COUNT(*) FROM persona WHERE tipo = 'alumno' AND LEFT(fecha_nacimiento, 4) = '1999';
SELECT d.nombre AS departamento, COUNT(p.id_profesor) AS num_de_profesores FROM departamento d JOIN profesor p ON d.id = p.id_departamento GROUP BY d.id ORDER BY num_de_profesores DESC;
SELECT d.nombre AS departamento, COUNT(p.id_profesor) AS num_de_profesores FROM departamento d LEFT JOIN profesor p ON d.id = p.id_departamento GROUP BY d.id;
SELECT g.nombre AS grado, COUNT(a.id) AS num_asignaturas FROM grado g LEFT JOIN asignatura a ON g.id = a.id_grado GROUP BY g.id ORDER BY num_asignaturas DESC;
SELECT * FROM ( SELECT g.nombre AS grado, COUNT(a.id) AS num_asignaturas FROM grado g JOIN asignatura a ON g.id = a.id_grado GROUP BY g.id ORDER BY num_asignaturas DESC ) src_alias WHERE num_asignaturas > 40;
SELECT g.nombre AS grado, a.tipo AS tipo_asignatura, SUM(a.creditos) AS num_creditos FROM grado g JOIN asignatura a ON g.id = a.id_grado GROUP BY g.id, a.tipo;
SELECT c.anyo_inicio, COUNT(m.id_alumno) AS num_alumnos FROM curso_escolar c LEFT JOIN alumno_se_matricula_asignatura m ON c.id = m.id_curso_escolar GROUP BY c.id;
SELECT per.id, per.nombre, apellido1, apellido2, COUNT(a.id) AS num_asignaturas FROM persona per LEFT JOIN asignatura a ON per.id = a.id_profesor WHERE per.tipo = 'profesor' GROUP BY per.id ORDER BY num_asignaturas DESC;
SELECT * FROM persona WHERE fecha_nacimiento = (SELECT MAX(fecha_nacimiento) FROM persona WHERE tipo = 'alumno');
SELECT per.nombre, apellido1, apellido2 FROM persona per JOIN profesor pro ON per.id = pro.id_profesor JOIN departamento d ON pro.id_departamento = d.id LEFT JOIN asignatura a ON pro.id_profesor = a.id_profesor WHERE a.id IS NULL;
