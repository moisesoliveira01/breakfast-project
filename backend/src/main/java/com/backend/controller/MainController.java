package com.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.model.CafeDaManha;
import com.backend.model.Colaborador;
import com.backend.repository.CafeDaManhaRepository;
import com.backend.repository.ColaboradorRepository;

@RestController
@RequestMapping("/api")
public class MainController {
	
	@Autowired
	ColaboradorRepository colaboradorRepository;
	
	@Autowired
	CafeDaManhaRepository cafeDaManhaRepository;
	
	@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<List<String>>> listarColabECafes() {
		
		List<String> colabCafes = colaboradorRepository.buscarColabCafe();
		List<List<String>> colabCafesLst = new ArrayList<List<String>>();
		
		for (String str : colabCafes) {
			List<String> divided = List.of(str.split(","));
			colabCafesLst.add(divided);
		}
		
		return new ResponseEntity<List<List<String>>>(colabCafesLst, HttpStatus.OK);
	}
	
	@PostMapping(value = "/colaborador")
	public ResponseEntity<Colaborador> salvarColaborador(@RequestBody Colaborador colaborador) {
		
		colaboradorRepository.salvarColab(colaborador.getNome(), colaborador.getCpf());
		
		return new ResponseEntity<Colaborador>(colaboradorRepository.buscarPorCpf(colaborador.getCpf()), HttpStatus.CREATED);
	}
	
	@PostMapping(value = "/cafedamanha")
	public ResponseEntity<CafeDaManha> salvarCafeDaManha(@RequestBody CafeDaManha cafe) {
		
		cafeDaManhaRepository.salvarCaf(cafe.getDescricao(), cafe.getColaborador().getId());
		
		return new ResponseEntity<CafeDaManha>(cafeDaManhaRepository.buscarPorDescricao(cafe.getDescricao()), HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/colaborador/{cpf}")
	public ResponseEntity<Colaborador> buscarColabPorCpf(@PathVariable String cpf) {
		
		Colaborador colab = colaboradorRepository.buscarPorCpf(cpf);
		
		return new ResponseEntity<Colaborador>(colab, HttpStatus.OK);
	}
	
	@GetMapping(value = "/cafedamanha/{descricao}")
	public ResponseEntity<CafeDaManha> buscarCafePorDescricao(@PathVariable String descricao) {
		
		CafeDaManha cafe = cafeDaManhaRepository.buscarPorDescricao(descricao);
		
		return new ResponseEntity<CafeDaManha>(cafe, HttpStatus.OK);
	}
	
	@PutMapping(value = "/colaborador")
	public ResponseEntity<Colaborador> atualizarColaborador(@RequestBody Colaborador colaborador) {
		
		colaboradorRepository.atualizar(colaborador.getNome(), colaborador.getCpf(), colaborador.getId());
		
		return new ResponseEntity<Colaborador>(colaborador, HttpStatus.OK);
	}
	
	@PutMapping(value = "/cafedamanha")
	public ResponseEntity<CafeDaManha> atualizarCafeDaManha(@RequestBody CafeDaManha cafe) {
		
		cafeDaManhaRepository.atualizar(cafe.getDescricao(), cafe.getId());
		
		return new ResponseEntity<CafeDaManha>(cafe, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/colaborador/{id}")
	public ResponseEntity<String> excluirColaborador(@PathVariable String id) {
		
		Long idColab = Long.parseLong(id);
		
		if (colaboradorRepository.buscarPorId(idColab) == null) {
			return new ResponseEntity<String>("não foi possível encontrar essa pessoa", HttpStatus.NOT_FOUND);
		}
		
		cafeDaManhaRepository.excluirPorColab(idColab);
		colaboradorRepository.excluir(idColab);
		
		return new ResponseEntity<String>("colaborador excluído com sucesso!", HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/colaborador")
	public ResponseEntity<String> excluirColabSemCafe() {
		
		colaboradorRepository.excluirSemCafe();
		
		return new ResponseEntity<String>("colaboradores excluídos com sucesso!", HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/cafedamanha/{descricao}")
	public ResponseEntity<String> excluirCafePorDescricao(@PathVariable String descricao) {
		
		cafeDaManhaRepository.excluirPorDescricao(descricao);
		
		return new ResponseEntity<String>("item excluído com sucesso!", HttpStatus.OK);
	}
}
