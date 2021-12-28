package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.backend.model.Colaborador;

@Repository
@Transactional
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
	
	@Query(value = "insert into colaborador(id, nome, cpf) values(nextval('seq_colab'), ?1, ?2)", nativeQuery = true)
	@Modifying
	void salvarColab(String nome, String cpf);
	
	@Query(value = "select * from colaborador where cpf = ?1", nativeQuery = true)
	Colaborador buscarPorCpf(String cpf);
	
	@Query(value = "select * from colaborador where id = ?1", nativeQuery = true)
	Colaborador buscarPorId(Long id);
	
	@Query(value = "update colaborador set nome = ?1, cpf = ?2 where id = ?3", nativeQuery = true)
	@Modifying
	void atualizar(String nome, String cpf, Long id);
	
	@Query(value = "delete from colaborador where id = ?1", nativeQuery = true)
	@Modifying
	void excluir(Long id);
	
	@Query(value = "delete from colaborador where id not in(select colaborador_id from cafe_da_manha)", nativeQuery = true)
	@Modifying
	void excluirSemCafe();
	
	@Query(value = "select colaborador.id, nome, cpf, descricao from colaborador join cafe_da_manha on colaborador.id = cafe_da_manha.colaborador_id", nativeQuery = true)
	List<String> buscarColabCafe();
}
