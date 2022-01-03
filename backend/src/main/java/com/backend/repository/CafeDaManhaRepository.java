package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.backend.model.CafeDaManha;

@Repository
@Transactional
public interface CafeDaManhaRepository extends JpaRepository<CafeDaManha, Long> {
	
	@Query(value = "insert into cafe_da_manha(id, descricao, colaborador_id) values(nextval('seq_caf'), ?1, ?2)", nativeQuery = true)
	@Modifying
	void salvarCaf(String descricao, Long idColab);
	
	@Query(value = "select * from cafe_da_manha where descricao = ?1", nativeQuery = true)
	CafeDaManha buscarPorDescricao(String descricao);
	
	@Query(value = "select * from cafe_da_manha where id = ?1", nativeQuery = true)
	CafeDaManha buscarPorId(Long id);
	
	@Query(value = "select * from cafe_da_manha where colaborador_id = ?1", nativeQuery = true)
	List<CafeDaManha> buscarPorColab(Long idColab);
	
	@Query(value = "update cafe_da_manha set descricao = ?1 where id = ?2", nativeQuery = true)
	@Modifying
	void atualizar(String descricao, Long idCafe);
	
	@Query(value = "delete from cafe_da_manha where colaborador_id = ?1", nativeQuery = true)
	@Modifying
	void excluirPorColab(Long idColab);
	
	@Query(value = "delete from cafe_da_manha where descricao = ?1", nativeQuery = true)
	@Modifying
	void excluirPorDescricao(String descricao);

}
